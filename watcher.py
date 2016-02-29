from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import time
import json
import os

"""
*** This script is intended to be running all the time in the background. the
*** purpose of the script is to monitor all of the selected directories append
*** update the tag list when files are moved or renamed.
"""

class Handler(FileSystemEventHandler):
    def on_moved(self, event):
        # ignore directories, they are not used in the tagging system
        if event.is_directory:
            return False
        # a file has been moved into, out of, or within one of the directories
        # look for the old destination in the dotfile
        dotfile = open(self.path + "/.taiifile.json").read()
        file_list = json.loads(dotfile)
        # remove the file from the list
        tags = file_list.pop(event.src_path, None)
        # add the tags to the new destination
        file_list[event.dest_path] = tags
        open(self.path + "/.taiifile.json", "w").write(json.dumps(file_list))

    def on_created(self, event):
        # ignore directories, they are not used in the tagging system
        if event.is_directory:
            return False
        # a file was created, add it to the dotfile
        dotfile = open(self.path + "/.taiifile.json").read()
        file_list = json.loads(dotfile)
        file_list[event.src_path] = []
        # write to the dotfile
        open(self.path + "/.taiifile.json", "w").write(json.dumps(file_list))


class Config_Handler(FileSystemEventHandler):
    def on_modified(self, event):
        # a file in the config folder was modified
        # if that file was the directory list
        if event.src_path == "~/.taiifile/dir_list.json":
            # load the new list
            new_dir_list = json.loads(open("~/.taiifile/dir_list.json", 'r').read())
            global dir_list
            # iterate the new file
            for path in new_dir_list:
                # if this directory isn't being watched
                if not path in dir_list:
                    # watch this directory
                    observer.schedule(handler, path, recursive=True)
            global path_watchers
            # iterate the old file
            for path in dir_list:
                # if this dir has been removed
                if not path in new_dir_list:
                    # stop watching this directory
                    observer.unschedule(path_watchers[path])

home = os.path.expanduser("~")
# open the directory list and tag list
try:
    dir_list = open(home + "/.taiifile/dir_list.json", 'r').read()
except FileNotFoundError as e:
    print(e)
    dir_list = "[]"
dir_list = json.loads(dir_list)
observer = Observer()
# listen for changes to the config files
config_handler = Config_Handler()
observer.schedule(config_handler, home + "/.taiifile", recursive=True)
# make a dict that contains all the paths being watched
path_watchers = {}
# start listening for changes in all of the directories
for path in dir_list:
    # open the dotfile, and create it if it doesn't exist
    try:
        dotfile = open(os.path.join(path, ".taiifile.json"), 'r').read()
    except FileNotFoundError as e:
        dotfile = "{}"
    file_list = json.loads(dotfile)
    # walk the directory and add any new file paths to the dotfile
    for root, dirs, files in os.walk(path):
        for filename in files:
            file_path = os.path.join(root, filename)
            if not file_path in file_list:
                file_list[file_path] = []
    # write the updated tag list to the dotfile
    open(os.path.join(path, ".taiifile.json"), 'w+').write(json.dumps(file_list))
    # start watching the directory for more changes
    handler = Handler()
    handler.path = path
    path_watchers[path] = observer.schedule(handler, path, recursive=True)

if len(dir_list) < 1:
    print("Add files to watch first")
    exit()
observer.start()
while 1:
    time.sleep(100)
