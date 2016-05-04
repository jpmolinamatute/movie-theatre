#!/usr/bin/env python

import os
import re

from sys import exit
from pymongo import MongoClient
from subprocess import check_call
from bson.objectid import ObjectId

class Movies(object):
    """docstring for Movies"""
    def __init__(self):
        super(Movies, self).__init__()
        client = MongoClient("mongodb://localhost:27017/")
        db = client.movietheatre
        self.collection = db.movies

    def convertTomp4(self):
        for file in os.listdir("."):
            if file.endswith(".avi"):
                target = os.path.splitext(file)[0]
                print(file)
                check_call(["ffmpeg", "-i", file, "-c:v", "libx264", "-crf", "19", "-preset", "slow", "-c:a", "aac", "-strict", "experimental", "-b:a", "192k", "-ac", "2", target + ".mp4"])
                os.remove("./" + file)

    def saveToDB(self):
        regex = re.compile("^[A-Za-z0-9]{17}\.[mp4kv]{3}$")
        myfiles = os.listdir()
        for f in myfiles:
            if not regex.fullmatch(f) and (f.endswith(".mp4") or f.endswith(".mkv")):
                movieData = {
                    "_id": str(ObjectId()),
                    "title": f
                }
                if f.endswith(".mp4"):
                    movieData["filetype"] = "mp4"
                if f.endswith(".mkv"):
                    movieData["filetype"] = "mkv"
                newId = self.collection.insert_one(movieData).inserted_id
                if newId:
                    print(newId + "." + movieData["filetype"], movieData["_id"])
                    os.rename(f, movieData["_id"] + "." + movieData["filetype"])



def main():
    try:
        mov = Movies()
        mov.saveToDB()
    except:
        exit(1)
    else:
        exit(0)

if __name__ == "__main__":
    main()
