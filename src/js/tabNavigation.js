let pages = {
	home: {
		name: "home",
		elem: document.getElementById("home"),
		navElem: document.getElementById("home-nav"),
		mobileNavElem: document.getElementById("mobile-home-nav")
	},
	videos: {
		name: "videos",
		elem: document.getElementById("videos"),
		navElem: document.getElementById("videos-nav"),
		mobileNavElem: document.getElementById("mobile-videos-nav")
	},
	about: {
		name: "about",
		elem: document.getElementById("about"),
		navElem: document.getElementById("about-nav"),
		mobileNavElem: document.getElementById("mobile-about-nav")
	},
	sponsors: {
		name: "sponsors",
		elem: document.getElementById("sponsors"),
		navElem: document.getElementById("sponsors-nav"),
		mobileNavElem: document.getElementById("mobile-sponsors-nav")
	},
	prereg: {
		name: "prereg",
		elem: document.getElementById("prereg"),
		navElem: document.getElementById("prereg-nav"),
		mobileNavElem: document.getElementById("mobile-prereg-nav")
	},
	contact: {
		name: "contact",
		elem: document.getElementById("contact"),
		navElem: document.getElementById("contact-nav"),
		mobileNavElem: document.getElementById("mobile-contact-nav")
	}
};

let currentPage = pages.home,
	mobileNavIcon = document.getElementById("ham-icon"),
	mobileCloseIcon = document.getElementById("close-icon"),
	mobileNavPage = document.getElementById("mobile-nav-page"),
	mobileNavPageFilter = document.getElementById("mobile-nav-page-filter"),
	mainBody = document.getElementById("main-body");

/* START NAVIGATION FOR DESKTOP */

//navigation function
function navigateToTab (pageName) {
	currentPage.elem.style.display = "none";
	currentPage.navElem.classList.remove("nav-selected");
	currentPage.navElem.style.borderTop = "solid 5px rgba(0,0,0,0)";
	currentPage.navElem.style.color = "#fff";

	/* importing themeChange object
	 * from themeChange.js
	 * to get the current theme color
	 */
	let theme = require("./themeChange");

	currentPage = pages[pageName];
	currentPage.elem.style.display = "block";
	currentPage.navElem.classList.add("nav-selected");
	currentPage.navElem.style.borderTop = `solid 5px ${theme.changes[0].colors[theme.currentThemeCounter]}`;
	currentPage.navElem.style.color = `${theme.changes[0].colors[theme.currentThemeCounter]}`;

	if (pageName==="contact")
		document.getElementById("image-container").style.opacity = 0.5;
	else
		document.getElementById("image-container").style.opacity = 1;
}

/* END NAVIGATION FOR DESKTOP */

/* START NAVIGATION FOR MOBILE */

// navigation function for mobile
function mobileNavigateToTab (pageName) {
	closeMobileNav();
	currentPage.elem.style.display = "none";
	currentPage.mobileNavElem.classList.remove("mobile-nav-selected");
	currentPage.mobileNavElem.style.color = "#fff";

	/* importing themeChange object
	 * from themeChange.js
	 * to get the current theme color
	 */
	let theme = require("./themeChange");

	currentPage = pages[pageName];
	currentPage.elem.style.display = "block";
	currentPage.mobileNavElem.classList.add("mobile-nav-selected");
	currentPage.mobileNavElem.style.color = `${theme.changes[0].colors[theme.currentThemeCounter]}`;

	// change opacity of glitch image
	if (pageName==="home")
		document.getElementById("image-container").style.opacity = 1;
	else
		document.getElementById("image-container").style.opacity = 0.4;
}

// open mobile navigation
function openMobileNav () {
	// making things disappear
	mainBody.style.opacity = "0";
	mobileNavIcon.style.opacity = "0";

	// adding transition to the appearance of nav list
	let transitionDelay = 0.1,
		transitionDuration = 0.2;
	document.querySelectorAll("#mobile-nav-list li").forEach(
		(navItem) => {
			navItem.style.transition = `opacity ${transitionDuration}s ${transitionDelay}s linear`;

			transitionDelay += 0.05;
		}
	);

	// making things appear
	mobileNavPage.style.display = "flex";
	mobileNavPage.style.opacity = 1;
	mobileNavPageFilter.style.transform = "scale(300)";

	setTimeout(
		() => {
			document.querySelectorAll("#mobile-nav-list li").forEach(
				(navItem) => {
					navItem.style.opacity = "1";
				}
			);
		},
		200
	);
}

// close mobile navigation
function closeMobileNav () {
	// making things disappear
	mobileNavPage.style.opacity = 0;
	setTimeout(function() {mobileNavPage.style.display = "none";}, 250);
	mobileNavPageFilter.style.transform = "scale(1)";

	document.querySelectorAll("#mobile-nav-list li").forEach(
		(navItem) => {
			navItem.style.opacity = "0";
		}
	);

	// making things appear
	mainBody.style.opacity = "1";
	mobileNavIcon.style.opacity = "1";
}

/* END NAVIGATION FOR MOBILE */

//binding onclick events
for (const page in pages) {
	//creating a closure
	(function () {
		let pageName = pages[page].name;
		pages[page].navElem.addEventListener("click", function () {
			navigateToTab(pageName);
		});
		pages[page].mobileNavElem.addEventListener("click", function () {
			mobileNavigateToTab(pageName);
		});
	})();
}
mobileNavIcon.addEventListener("click", openMobileNav);
mobileCloseIcon.addEventListener("click", closeMobileNav);
