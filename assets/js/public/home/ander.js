var cacheTitle = document.title.replace("Flowtime.js | ", "");
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-1228618-10']);
		_gaq.push(['_trackPageview']);
		_gaq.push(['_trackEvent', 'Flowtime', 'Landing', document.title]);
		(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();

		// Configuration API test
		Flowtime.showProgress(true);
		// Flowtime.fragmentsOnSide(true);
		// Flowtime.fragmentsOnBack(true);
		// Flowtime.useHistory(false);
		// Flowtime.slideInPx(true);
		// Flowtime.sectionsSlideToTop(true);
		// Flowtime.gridNavigation(false);
		// Flowtime.useOverviewVariant(true);
		Flowtime.parallaxInPx(true);
		//
		// event management
		// Flowtime.addEventListener("flowtimenavigation", onNavigation, false);
		Flowtime.onNavigation(onNavigation);
		function onNavigation(e)
		{
			_gaq.push(['_trackEvent', 'Flowtime', 'Navigation', cacheTitle + ' > ' + document.title.replace("Flowtime.js | ", "")]);
			// console.log(cacheTitle + ' > ' + document.title.replace("Flowtime.js | ", ""));
			cacheTitle = document.title.replace("Flowtime.js | ", "");
			//console.log('section', e.section, 'sectionIndex', e.sectionIndex);
			//console.log('page', e.page, 'pageIndex', e.);
			//console.log('pastSectionIndex', e.pastSectionIndex, 'pastPageIndex', e.pastPageIndex);
			//console.log('prevSection', e.prevSection);
			//console.log('nextSection', e.nextSection);
			//console.log('prevPage', e.prevPage);
			//console.log('nextPage', e.nextPage);
			//console.log('fragment', e.fragment, + 'fragmentIndex', e.fragmentIndex);
			//console.log("isOverview", e.isOverview);
			//console.log('progress:', e.progress, 'total:', e.total);
			// var value = Math.round(e.progress * 100 / e.total);
			// console.log('Completion: ' + value + '%');
		}
		// starts the application with configuration options
		Flowtime.start();

