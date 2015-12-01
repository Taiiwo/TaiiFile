TaiiCMS - The Non-Standard Content Management System
====================================================

TaiiCMS is a content management system written for `mod_python`
and `mongodb`. It provides a simple way to manage and develop
a webpage. TaiiCMS attempts to provide the basic features required
by most projects in a non-intrusive way.

TaiiCMS is broken up into two parts: authentication, and pagination.

Authentication
--------------

The authentication services included within TaiiCMS provide a simple
JSON API to the front end, allowing each page to execute database
functions as simply as possible. By using this method of authentication,
it is possible to completely redesign your site, while still allowing
the front end to authenticate and perform actions on the user. The design
that comes with TaiiCMS is simply a material design base.

Pagination
----------

This is where TaiiCMS becomes non-standard. Traditional CMSs save
content inside a database, allowing it to be retrieved using
templating systems. TaiiCMS stores none of your content in databases
and instead stores it in traditional HTML files. The distiction
between the method used by TaiiCMS and the traditional method of
storing content inside individual files is that TaiiCMS stores
it's content within webcomponent-compatible elements known as
Polymer Elements.

The Polymer framework allows developers to import Polymer Elements
in the form of HTML files, and place them on the page. TaiiCMS
uses a combination of Polymer Elements to load pages from the
`/pages` directory, and switches between them using JavaScript.

How to Use TaiiCMS
------------------

### Configuration
While TaiiCMS is widely configurable in that it is open to modification,
any configuration options provided by the default installation can be
found in `index.html`, for front-end configuration; and `api.py`, for
configuration of the back-end.

### Creating or Editing a Page
In order to edit or create a page, one must do so within the `/pages`
directory. Here you must construct a valid polymer element that will
be displayed in the main content section of the page.

If you are creating a new page, you will need to import and include it
within `index.html`. You must add an `<import>` tag in the head of the
document, and an element within the `<app-router>` section of `index.html`.
Then you will be able to use `site.router('/desination')` to navigate to
your new page, or simply navigate to `#/desitnation` in the URI.

### The API
The JavaScript library `js/site.js` creates the `site` object. `site`
controls many of the features of TaiiCMS, and it is reccomended that it
is kept, as long as you are still using TaiiCMS's pagination.

The JavaScript library `js/api.js` creates the `api` object. `api`
contains all of the wrapping for TaiiCMS's Python API.
