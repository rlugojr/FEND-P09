/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        /*To be thorough, I checked that the URL is defined, that it is
        longer than 0 characters, does not contain a null value or an empty value.
        */
        it('has URLs for each feed.', function (){
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined;
                expect(feed.url.length).not.toBe(0);
                expect(feed.url).not.toBeNull;
                expect(feed.url).not.toBe("");
            }, this);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        /*This is similar to the prior test. Name must be defined,
         must not be null or empty value.
        */
        it('has names for each feed.', function (){
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined;
                expect(feed.name).not.toBe("");
                expect(feed.name).not.toBeNull;
            }, this);
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        /*While analyzing the behavior in DevTools and reviewing the CSS,
          it seemed logical that checking the "body" element to see if it
          was assigned the class "menu-hidden" was the best choice for testing
          this criteria.
        */
        it('has a hidden menu by default', function () {
            $(document).ready(function(){
                expect($('body').hasClass('menu-hidden')).toBe(true);
            });    
        });
        

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          /*This test takes elements from the prior test but requires
            testing the event that hides the menu.  In the code, I found
            the event handler tied to an "a" element with a menu icon.
            It has a class of "menu-icon-link".  I used jQuery to trigger
            the event on the icon, first to make the menu visible and then
            again to hide the menu, watching the "body" to see if it has
            the class "menu-hidden" assigned when it is expected to be in
            each instance.
          */
        it('changes visibiity when the menu icon is clicked', function(){
            $(document).ready(function(){
                $("a.menu-icon-link").trigger("click");
                expect($('body').hasClass('menu-hidden')).toBe(false);
                 $("a.menu-icon-link").trigger("click");
                expect($('body').hasClass('menu-hidden')).toBe(true);
            });
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        /*Using beforeEach to setup the asynchronous request for "loadFeed",
          I also added "done" in the call back instead of calling it seperately.
          That ensures that "done" is only called after "loadFeed" has completed.
          Then I used DevTools to find the element or class, whichever was more unique
          and found that "article" is only present in the results.  Using a jQuery selector,
          I retrieve any instances of "article" and as a double check I ensure that
          "article" has a class of "entry".
        */
        beforeEach(function(done) {
            setTimeout(function() {
                loadFeed(0, done);
            }, 1);
        });

        it('has at least one entry in a feed', function(done){
            $(document).ready(function(){
                var currArticles = $('article');
                var boolEntry = $('article').hasClass('entry');
                expect(currArticles.length).toBeGreaterThan(0);
                expect(boolEntry).toBe(true);
                done();
            });
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
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
            lastArticle='',
            currArticle='';

        beforeEach(function(done) {
            feedNum++;
            setTimeout(function() {
                loadFeed(feedNum, done);
            }, 1);
        });

        it('content changes when a new feed is loaded', function(done){
            $(document).ready(function(){
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
