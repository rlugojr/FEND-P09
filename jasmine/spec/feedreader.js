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
        //Ensure that allFeeds object is defined and is not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /*Ensure each RSS Feed URL is defined, is longer than 0 characters,
         *does not contain a null value and is a valid URL.
        */
        it('have URLs for each feed.', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined;
                expect(feed.url.length).not.toBe(0);
                expect(feed.url).not.toBeNull;
                expect(re_weburl.test(feed.url)).toBe(true);  //Uses regex-weburls.js to check for valid URL
            }, this);
        });

        /*Ensure that each feed has a name value that is not null
         * and doesn't have one or more space characters.
        */
        it('have a name value for each feed.', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined;
                expect(feed.name.trim()).not.toBe("");
                expect(feed.name).not.toBeNull;
            }, this);
        });
    });


    describe('The menu', function() {

        //*Ensure the "body" element has the class "menu-hidden" assigned by default. 
        it('is hidden by default', function() {
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
        /*Using beforeEach to call "loadFeed" with a callback that returns "done"
         *Keep "setTimeout()" in case the call to loadFeed takes to long to return.
        */
        beforeEach(function(done) {
            setTimeout(function() {
                loadFeed(0, done);
            }, 1);
        });
        /*After "loadFeed" has completed and "Done is called, use a jQuery selector
         *to confirm that any instances of "feed .article" has at least one article 
         *element assigned the class "entry".
        */
        it('have at least one entry in a feed', function(done) {
            $(document).ready(function() {
                var allEntries = $('div.feed').find('article.entry')
                expect(allEntries.length).toBeGreaterThan(0);
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
        //declare variables within the test suite scope.
        var textNodes0,
            textNodes1, 
            allArticles = [];
         
        /*Using beforeEach to call "loadFeed" for two different RSS Feeds
         *with a callback that returns "done".  Store article entries in variables for each feed.
         *Keep "setTimeout()" in case the call to loadFeed takes too long to return.
        */
        beforeEach(function(done){
            setTimeout(function() {
                loadFeed(1, function(){
                    textNodes1 = $('div.feed').find('article.entry > h2').contents();
                    setTimeout(function() {
                        loadFeed(0,function(){
                            textNodes0 = $('div.feed').find('article.entry > h2').contents();
                            done();
                        });
                    },1);    
                });
            },1);
        });

        /*Save the text nodes from each RSS Feed into an "entries" array.
         *Populate the allArticles array with each entry from the first RSS Feed.
        */
        it('content changes when a new feed is loaded', function(done) {
            $(document).ready(function() {
                var entries0 = textNodes0.toArray();
                entries0.forEach(function(entry){
                    allArticles.push(entry);
                    console.log(entry)
                });
         /*Using jQuery.inArray, check each text node from the second RSS Feed against
         *the values already in the allArticles array.
         *Returns -1 if the value isn't found in the array.  Add the value to the array.
         *Returns an index position if the value is found in the array.  Test fails in this case.
        */
                var entries1 = textNodes1.toArray();
                entries1.forEach(function(entry){
                    expect($.inArray(entry,allArticles)).toBe(-1);
                    allArticles.push(entry);
                    console.log(entry)
                });
                done();
            })
        });
    });
}());
        /*Testing every entry is preferable because in the case when feeds don't change for any given reason,
         *but a new entry is added to the same feed, a false positive condition would ocurr when comparing
         *the resulting HTML at the page level only instead of the individual entries.
        */