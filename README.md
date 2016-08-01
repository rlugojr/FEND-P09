# FEND-P09

## Feed Reader Testing

---

### Purpose

The purpose of this project is to learn and apply JS testing tools, such as Jasmine (in this case), to implement T.D.D (Test Driven Development) or to have a library of test suites which can be used
to validate your source code before each build.
_Note: This repository contains my version of the solution to complete Udacity's Front End Web Developer's Project #09._

---

### Features

- Sample application provided by the awesome team at Udacity.
- Examples of Jasmine test suites, created to test the sample application.
- Validation of feeds using "regex-weburls.js", courtesy of [Diego Perini's](http://www.iport.it) _Regular Expression for URL validation_ [Gist](https://gist.github.com/dperini/729294)

---

### The Test Suites

| Test Suite | Test | Description|
|------------|------|------------|
| RSS Feeds| 'are defined' | Confirm that the object returned from loadFeed is defined and not empty. |
| RSS Feeds| 'have URLs for each feed.' | Ensure each URL in each RSS feed is defined, contains a value and that the value has been validated |
| RSS Feeds| 'have a name value for each feed.' | Confirm that each feed has a "name" value assigned and is not empty |
| The Menu | 'is hidden by default' | The menu must be hidden by default on startup. |
| The Menu | 'is shown when the menu icon is clicked' | Trigger the assigned click event to display the menu and confirm that it functioned as expected.|
| The Menu | 'is hidden when the menu icon is clicked again' | Trigger the click event again to hide the menu.|
| Initial Entries | 'have at least one entry in a feed' | Confirm that at least one "entry" is available in the "feed" container after loadFeed() is called. |
| New Feed Selection | 'content changes when a new feed is loaded' | Confirm that the entries change when a new RSS feed is loaded using loadFeed() |

---

### Using this Project

To run this project:

```english
1. Download or Fork this repository.
2. Open "index.html" in a modern browser.
3. Watch the tests flash by, the main application paints and then
   scroll down to see the results of the test suites.
```

Also, you can view a running instance of my [version](https://rlugojr.github.io/FEND-P09/), hosted on GitHub Pages.

---

### Support

If you have any difficulty using this project or understanding the code,
please refer to this excellent online source => [Project Technical Docs](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001)

---

### License

The original source code was forked from Udacity's repository for this project [Front-End Nanodegree Feedreader Testing](https://github.com/udacity/frontend-nanodegree-feedreader).  Please refer to that repository for any applicable license information.

My solution to the assignment is free for use by anyone, especially other Udacity FEND students who could benefit from the examples provided.
[Free Public License 1.0.0](https://opensource.org/licenses/FPL-1.0.0)

```english
Free Public License 1.0.0
Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD
TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS.
IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR
CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR
IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```