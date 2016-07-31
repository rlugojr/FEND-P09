/**
  * FEND-09 Feedreader Testing
  * feedreader.js v2.0
  * 
  * AUTHOR: Ray Lugo, Jr.
  * UPDATED: 2016-07-30
  * LICENSE: FPL1.0.0
  * SOURCE: github.com/rlugojr/FEND-P09
  * PURPOSE: Submission for Udacity Front End Web Developer Project #9, "Feedreader Testing"
  *          This JS file contains the Jasmine Test Suites "Spec" developed to test the sample application. 
 */

//Use the $() function ensures that the tests do not run until the DOM is ready.
$(function() {
    //Create a test suite for the RSS Feeds.
    describe('RSS Feeds', function() {
        //Ensure that allFeeds object is defined and not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /*Ensure each RSS Feed URL is defined, is longer than 0 characters,
         *does not contain a null value and is a valid URL.
        */
        it('has URLs for each feed.', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined;
                expect(feed.url.length).not.toBe(0);
                expect(feed.url).not.toBeNull;
                expect(re_weburl.test(feed.url)).toBe(true);  //Use regex-weburls.js to check for valid URL
            }, this);
        });

        //Ensure that each feed has a name value that is not null or one or more space characters.
        it('has names for each feed.', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined;
                expect(trim(feed.name)).not.toBe("");
                expect(feed.name).not.toBeNull;
            }, this);
        });
    });


    describe('The menu', function() {

        //*Ensure the "body" element has the class "menu-hidden" assigned by default. 
        it('has a hidden menu by default', function() {
            $(document).ready(function() {
                expect($('body').hasClass('menu-hidden')).toBe(true);
            });
        });


        /*Ensure that the "a" element is assigned the class "menu-icon-link"
         *Trigger the "click" event on "a" and confirm that the menu is visible.
         *Trigger the "click" event on "a" again and confirm that the menu is hidden
         *by confirming that "body .menu-hidden" is present.
        */
        it('changes visibiity when the menu icon is clicked', function() {
            $(document).ready(function() {
                $("a.menu-icon-link").trigger("click");
                expect($('body').hasClass('menu-hidden')).toBe(false);
                $("a.menu-icon-link").trigger("click");
                expect($('body').hasClass('menu-hidden')).toBe(true);
            });
        });
    });

    //Test Suite for RSS Feed entries.
    describe('Initial Entries', function() {

        //Using beforeEach to call "loadFeed" with a callback that returns "done"
        beforeEach(function(done) {
            setTimeout(function() {
                loadFeed(0, done);
            }, 1);
        });
        /*After "loadFeed" has completed and "Done is called, use a jQuery selector
         *to confirm that any instances of "feed .article" has an element
         *is assigned the class "entry".
        */
        it('has at least one entry in a feed', function(done) {
            $(document).ready(function() {
                var currArticles = $('article');
                var boolEntry = $('article').hasClass('entry');
                expect(currArticles.length).toBeGreaterThan(0);
                expect(boolEntry).toBe(true);
                done();
            });
        });
    });

    //Test Suite for RSS Feed Selection change.
    describe('New Feed Selection', function() {

        /*Very similar to the prior test, using the structure for handling asynchronous requests.
          This test required declaring local variables
          outside of each function so that they are accessible anywhere.  One variable
          keeps track of the feedIndex to be loaded and the other two contain the prior
          feed's article text and the current feed's article text for comparison, to 
          ensure that the text is different each time the feed is switched.  By using a forEach
          loop we don't need to keep count or worry about running "loadFeed" with an invalid index
          which would generate an error.
        */
        var feedNum = -1,
            lastArticle = '',
            currArticle = '';

        beforeEach(function(done) {
            feedNum++;
            setTimeout(function() {
                loadFeed(feedNum, done);
            }, 1);
        });

        it('content changes when a new feed is loaded', function(done) {
            $(document).ready(function() {
                allFeeds.forEach(function(feed) {
                    var currArticles = $('article');
                    currArticle = currArticles[0];
                    expect(lastArticle).not.toBe(currArticle);
                    done();
                }, this);
            });
        });
    });
}());