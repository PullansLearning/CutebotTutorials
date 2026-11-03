// The online class-center client was removed: this site has no login backend.
// Pages and other scripts still expect window.EDUXCenter, so expose the original offline face.
(function () {
'use strict';
function offlineFace() {
if (window.EDUXCenter) return;
window.EDUXCenter = {
who: function () { return null; }, isOnline: function () { return false; },
loginHref: function () { return ''; }, startHref: function () { return ''; },
citizenHref: function () { return ''; }, homeHref: function () { return null; },
linkCitizen: function () { return Promise.resolve({ ok: false, error: 'offline' }); },
ask: function () { return Promise.resolve({ error: 'offline' }); },
};
}
offlineFace();
})();
