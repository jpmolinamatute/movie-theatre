#!/usr/bin/env python

from pymongo import MongoClient
import os

client = MongoClient("mongodb://localhost:27017/")
db = client.movietheatre
collection = db.movies

def listFiles():
    movies = collection.find()
    for m in movies:
        if "thumbnailfile" in m:
            oldName = m["thumbnailfile"]
            if os.path.isfile(oldName):
                newName = "./thumbnails/" + m["_id"] + ".jpg"
                os.rename(oldName, newName)


def main():
    listFiles()


if __name__ == "__main__":
    main()
