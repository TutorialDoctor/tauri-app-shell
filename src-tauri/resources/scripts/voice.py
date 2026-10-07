import sys
from kittentts import KittenTTS
import soundfile as sf

try:
    print(sys.argv)
    
    # 1. Grab inputs safely from sys.argv
    text_prompt = sys.argv[1] if len(sys.argv) > 1 else "Hello. I'm Rosie. I am a high quality voice for Kitten-TTS."
    voice_name = sys.argv[2] if len(sys.argv) > 2 else "Bella"
    
    # 2. Grab the dynamic absolute path sent by Tauri's resolveResource()
    # Fall back to a local path only if running the python script standalone for testing
    output_file_path = sys.argv[3] if len(sys.argv) > 3 else "output.wav"

    model = KittenTTS("KittenML/kitten-tts-mini-0.8")
    audio = model.generate(text_prompt, voice=voice_name)

    # 3. Write directly to the path Tauri provided
    sf.write(output_file_path, audio, 24000)
    
except Exception as e:
    print(f"Error during execution: {e}")

print(": Generation Complete!")
sys.stdout.flush()