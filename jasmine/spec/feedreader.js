/*
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
    //useing function form of 'use strict' to prevent overflow into other code.
    'use strict';
    //Create a test suite for the RSS Feeds.
    describe('RSS Feeds', function() {
        //Ensure that allFeeds object is defined and is not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(feed.url).toBeTruthy();//Per Reviewer notes.
            expect(allFeeds.length).not.toBe(0);
        });

        /*Ensure each RSS Feed URL is defined, is longer than 0 characters,
         *does not contain a null value and is a valid URL.
        */
        it('have URLs for each feed.', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                //expect(feed.url.length).not.toBe(0);
                expect(feed.url).toBeTruthy(); //Per Reviewer notes.
                expect(re_weburl.test(feed.url)).toBe(true);  //Uses regex-weburls.js to check for valid URL
            });
        });

        /*Ensure that each feed has a name value that is not null
         * and doesn't have one or more space characters.
        */
        it('have a name value for each feed.', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).toBeTruthy();//Per Reviewer notes.
            });
        });
    });


    describe('The menu', function() {

        //*Ensure the "body" element has the class "menu-hidden" assigned by default. 
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


        /*Ensure that the "a" element is assigned the class "menu-icon-link"
         *Trigger the "click" event on "a" and confirm that the menu is visible.
        */
        it('is shown when the menu icon is clicked', function() {
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
        });

        /*Trigger the "click" event on "a" again and confirm that the menu is hidden
         *by confirming that "body .menu-hidden" is present.
         */
        it('is hidden when the menu icon is clicked again', function() {
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $("a.menu-icon-link").click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    //Test Suite for RSS Feed entries.
    describe('Initial Entries', function() {
        /*Using beforeEach to call "loadFeed" with a callback that returns "done"
         *Keep "setTimeout()" in case the call to loadFeed takes to long to return.
        */
        beforeEach(function(done) {
                loadFeed(0, done);
        });
        /*After "loadFeed" has completed and "Done is called, use a jQuery selector
         *to confirm that any instances of "feed .article" has at least one article 
         *element assigned the class "entry".
        */
        it('have at least one entry in a feed', function() {
            $(document).ready(function() {
                var allEntries = $('.feed .entry');
                expect(allEntries.length).toBeGreaterThan(0);
            });
        });
    });

    //Test Suite for RSS Feed Selection change.
    describe('New Feed Selection', function() {
        //declare variables within the test suite scope.
        var textNodes0,
            textNodes1;
         
        /*Using beforeEach to call "loadFeed" for two different RSS Feeds
         *with a callback that returns "done" at the end of the chain.
         *Store the html of each article entry in an array for each feed.
         */
        beforeEach(function(done){
            loadFeed(1, function(){
                textNodes1 = $('div.feed').find('article.entry > h2').html();
                loadFeed(0,function(){
                    textNodes0 = $('div.feed').find('article.entry > h2').html();
                    done();
                });
            });
        });

        /*Compare the textNodes arrays to ensure the contents of each are different.
         *Populate the allArticles array with each entry from the first RSS Feed.
        */
        it('content changes when a new feed is loaded', function() {
            $(document).ready(function() {
                expect(textNodes0).not.toBe(textNodes1);
            });
        });
    });
}());
        /*TODO: Implement method for testing entries from each loadFeed call against the next.
         *This way we are certain that the entire contents are different or, if the next RSS feed
         *fails to load but the same RSS feed did have a new entry, we wouldn't rely on only the latest
         *entry as a basis for comparison between "snapshots" of the RSS Feeds and avoid false positives.
        */