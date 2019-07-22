# Uses pychorus to analyze music and find the chorus
# Then extract 15 seconds of the chorus with pydub

from pychorus import find_and_output_chorus
from pydub import AudioSegment
import os


path = '.'
wav_folder = os.fsencode(path)


for file in os.listdir(wav_folder):
    fileName = os.fsdecode(file)
    print("Figuring out the best chorus time for:", fileName)
    if ".wav" in fileName:
        # Extract the start time for best chorus
        chorus_start_sec = find_and_output_chorus(fileName, './music_analysis/analysis.wav', clip_length=15)i
        
        if chorus_start_sec == None:
            print("Song had no chorus... Moving onto next song")
            continue
        chorus_end_sec = chorus_start_sec + 15

        # Time in milliseconds
        start_time = chorus_start_sec * 1000
        end_time = chorus_end_sec * 1000

        # Audio extraction and export (wav -> mp3)
        fileName = fileName.replace('.wav', '')
        song = AudioSegment.from_wav(fileName + '.wav')
        segment = song[start_time:end_time]
        segment.export('./Top40_Extract/' + fileName + '-extract.mp3', format='mp3')
        
