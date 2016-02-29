TaiiFile - The Advanced File Tagging System
===========================================

TaiiFile is a file tagging system like you've never seen before. This
documentation will go through all the features that sets TaiiFile apart
from the crowd, how to get started with TaiiFile, and explainations on
how to expand ontop of TaiiFile.

Features
--------

### JSON Tagging System

TaiiFile does not use a database. It maintains a JSON file for each
directory watched. This file is simple to parse, and you can add it to
your own system. Using a JSON file for the tag records means that your
TaiiFile tagging system will work with git, bittorrent sync, Google
Drive, as well as Windows, Mac, and Linux. You can even view the tagging
system on readonly file protocols like HTTP and FTP. All we have to do
is read and search the tag file.


### Tags and Groups

TaiiFile uses a parent and child based hierarchy to make tagging as
simple as possible. Each group has inherent groups, and child tags. It's
like this so that you can add a whole bunch of information that's
implied automatically.

Here's an example: We have a big messy folder full of pictures of
different types of animals. In order to create a tagging system to sort
and search these files, we need to establish a hierarchy. First we
create an 'animals' group. Then we create a group for 'birds', 'fish',
'mammals', 'reptiles', 'anphibians', etc... each with the 'animals'
group listed as a parent. Then you go through all the files, adding tags
as you go, and adding them to the above categories. You can add more
groups where you think it's neccesary based on the quantities of animals
in different categories, but you can easily manage this later. This is a
single sorting system. You could also add one for colour, skin type,
hunting group, local region, the list is endless.

Finally, you'll have a system that is capable of searching for the
equivalent of "all the green reptile predetors from africa", "all the
asian cats, except white ones", "only pictures that include both cats
and dogs". Again, endless possiblities.


### Logical Search Queries

TaiiFile includes a search query language that adds context to items
with 'pills'. A pill is a pipe delimited pair of group and tag, for
example: "animal|cat" or "mammal|cat" are both equivalent. Then you can
apply operators:

| operator | meaning                                                    |
|----------|------------------------------------------------------------|
| +        | also - animals|dog+cat: dogs, cats, and both dogs and cats |
| -        | not - animals|dog-cat: Dogs without cats                   |
| &        | and - animals|dog&cat: Dogs and cats. Only both.           |
| /        | or - animals|dog/cat: Only dogs or Only cats. Not both.    |
| !        | only - animals|dog!: Just dogs. Nothing else.              |


### Smart Tags

### Auto Tags


Developing with TaiiFile
