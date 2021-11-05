// ==UserScript==
// @name         JIRA Work Item Column Age
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Replaces the 3 little dots in JIRA with work item age. (Technically column age)
// @author       You
// @match        https://*/secure/RapidBoard.jspa?rapidView=*
// @icon         https://www.google.com/s2/favicons?domain=atlassian.com
// @grant        none
// @run-at       document-end
// ==/UserScript==


(function() {
    'use strict';

    function replaceDots() {
        var footers = document.querySelectorAll('.ghx-card-footer');

        for (const f of footers) {

            var dotsDiv = f.querySelectorAll('.ghx-days')[0];
            var numDays = Number(dotsDiv.getAttribute('title').split(" ")[0]);
            numDays++; // cant be in a column for 0 days

            var alreadyAdded = f.querySelectorAll('.days-in-column');
            if (alreadyAdded.length == 0) {
                var newDiv = document.createElement('div');
                var numDaysNode = document.createTextNode(numDays + (numDays == 1 ? " day" : " days"));
                newDiv.appendChild(numDaysNode);
                newDiv.setAttribute('class', 'days-in-column');
                f.appendChild(newDiv);

                dotsDiv.style.visibility = 'hidden';
            }
        }
    }

    function periodicallyReplaceDots() {
        replaceDots();
        setTimeout(periodicallyReplaceDots, 1000);
    }

    periodicallyReplaceDots();
})();
