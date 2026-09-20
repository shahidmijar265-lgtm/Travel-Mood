// Web Audio API ambient synthesizer for Nepal sensory guide
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSensorySound(type: 'singing_bowl' | 'mountain_wind' | 'river_rapids' | 'prayer_wheel', durationSeconds: number = 4) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (type === 'singing_bowl') {
      // Harmonic series of a bronze 7-metal Tibetan Singing Bowl (fundamental ~260Hz + harmonics)
      const frequencies = [261.63, 523.25, 784.88, 1046.5];
      const gains = [0.4, 0.25, 0.15, 0.08];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq + (Math.random() * 2 - 1), now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(gains[idx], now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + durationSeconds);
      });
    } else if (type === 'prayer_wheel') {
      // Spinning wooden axle resonance with soft clink of metal weight
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.6);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.8);
    } else if (type === 'mountain_wind' || type === 'river_rapids') {
      // Noise buffer synthesis
      const bufferSize = ctx.sampleRate * durationSeconds;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = type === 'river_rapids' ? 'bandpass' : 'lowpass';
      filter.frequency.setValueAtTime(type === 'river_rapids' ? 600 : 350, now);
      filter.frequency.linearRampToValueAtTime(type === 'river_rapids' ? 900 : 200, now + durationSeconds);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.5);
      gain.gain.linearRampToValueAtTime(0.001, now + durationSeconds);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + durationSeconds);
    }
  } catch (err) {
    console.warn('Audio playback not supported or user gesture needed:', err);
  }
}
