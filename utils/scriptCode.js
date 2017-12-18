var preBidHeaderTwo = `
<!-- Prebid Header Bidding Setup -->
var PREBID_TIMEOUT = 700;
var MAX_RETRIES = 20;

var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];
pbjs.retries = 0;
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
googletag.cmd.push(function () {
    googletag.pubads().disableInitialLoad();
});

function initAdserver() {
  if (pbjs.initAdserverSet) return;

  if(!googletag.pubadsReady && pbjs.retries <= MAX_RETRIES) {
    setTimeout(initAdserver, 50);
    pbjs.retries++;
    return;
  }
  googletag.cmd.push(function () {
    pbjs.que.push(function () {
      pbjs.setTargetingForGPTAsync();
      pbjs.enableAnalytics({
        provider: 'pulsepoint'
      });
    });
    googletag.pubads().refresh();
  });
  pbjs.initAdserverSet = true;
}

loadScript('//www.googletagservices.com/tag/js/gpt.js');
loadScript('//www.uhnd.com/scripts/prebid.min.js');

function loadScript(scriptSrc) {
  var script = document.createElement('script');
  script.async=true;
  script.type = 'text/javascript';
  script.src = scriptSrc;
  var node = document.getElementsByTagName('script')[0];
  node.parentNode.insertBefore(script, node);
}

pbjs.que.push(function() {
  var BrowserWidth = window.innerWidth && document.documentElement.clientWidth ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
  var adUnits = [{
    code: "ad-leaderboard-one",
    bids: [{
      bidder: 'rubicon',
      params: {
        accountId: 10844,
        siteId: 118032,
        zoneId: (BrowserWidth >= 768) ? 590684 : 590690
      }
    }, {
       bidder: 'sovrn',
       params: {
          tagid: (BrowserWidth >= 768) ? 435816 : 468068
      }
    }, {
      bidder: 'pulsepoint',
      params: {
        cf: (BrowserWidth >= 768) ? '728X90' : '320X50',
        cp: 560738,
        ct: (BrowserWidth >= 768) ? 552589 : 552590
      }
    }, {
      bidder: 'aol',
      params: {
          placement: BrowserWidth >= 768 ? '4568564' : '4596959',
          network: '10809.1'
      }
  }, {
    bidder: "districtmDMX",
    params: {
      id: (BrowserWidth >= 768) ? 167668 : 167671
    }
  }],
    sizes: (BrowserWidth >= 768) ? [728, 90] : [320, 50]
  }, {
    code: "ad-leaderboard-two",
    bids: [{
      bidder: 'rubicon',
      params: {
        accountId: 10844,
        siteId: 118032,
        zoneId: (BrowserWidth >= 768) ? 590686 : 590692
      }
    }, {
       bidder: 'sovrn',
       params: {
          tagid: (BrowserWidth >= 768) ? 467784 : 468069
      }
    }, {
      bidder: 'pulsepoint',
      params: {
        cf: (BrowserWidth >= 768) ? '728X90' : '320X50',
        cp: 560738,
        ct: (BrowserWidth >= 768) ? 583858 : 583861
      }
    }, {
      bidder: 'aol',
      params: {
          placement: BrowserWidth >= 768 ? '4596962' : '4596960',
          network: '10809.1'
      }
  }, {
    bidder: "districtmDMX",
    params: {
      id: (BrowserWidth >= 768) ? 167669 : 167672
    }
  }],
    sizes: (BrowserWidth >= 768) ? [728, 90] : [320, 50]
  }, {
    code: "ad-leaderboard-article",
    bids: [{
      bidder: 'rubicon',
      params: {
        accountId: 10844,
        siteId: 118032,
        zoneId: (BrowserWidth >= 768) ? 590688 : 590694
      }
    }, {
       bidder: 'sovrn',
       params: {
          tagid: (BrowserWidth >= 768) ? 467786 : 468070
      }
    }, {
      bidder: 'pulsepoint',
      params: {
        cf: (BrowserWidth >= 768) ? '728X90' : '320X50',
        cp: 560738,
        ct: (BrowserWidth >= 768) ? 583863 : 583864
      }
    }, {
      bidder: 'aol',
      params: {
          placement: BrowserWidth >= 768 ? '4596957' : '4596961',
          network: '10809.1'
      }
  }, {
    bidder: "districtmDMX",
    params: {
      id: (BrowserWidth >= 768) ? 167670 : 167673
    }
  }],
    sizes: (BrowserWidth >= 768) ? [728, 90] : [320, 50]
  }, {
    code: "ad-medrec-one",
    bids: [{
      bidder: 'rubicon',
      params: {
        accountId: 10844,
        siteId: 118032,
        zoneId: 590696
      }
    }, {
       bidder: 'sovrn',
       params: {
          tagid: 435824
      }
    }, {
       bidder: 'sovrn',
       params: {
          tagid: 435820
      }
    }, {
      bidder: 'pulsepoint',
      params: {
        cf: '300X600',
        cp: 560738,
        ct: 554373
      }
    }, {
      bidder: 'pulsepoint',
      params: {
        cf: '300X250',
        cp: 560738,
        ct: 552591
      }
    }, {
        bidder: 'aol',
        params: {
            placement: 4568565,
            network: '10809.1'
        }
    }, {
      bidder: 'aol',
      params: {
          placement: 4596967,
          network: '10809.1'
      }
  }, {
    bidder: "districtmDMX",
    params: {
      id: '167674'
    }
  }],
    sizes: [
      [300, 600],
      [300, 250]
    ]
  }, {
    code: "ad-medrec-two",
    bids: [{
      bidder: 'rubicon',
      params: {
        accountId: 10844,
        siteId: 118032,
        zoneId: 590698
      }
    }, {
       bidder: 'sovrn',
       params: {
          tagid: 435828
      }
    }, {
      bidder: 'pulsepoint',
      params: {
        cf: '300X250',
        cp: 560738,
        ct: 552592
      }
    }, {
        bidder: 'aol',
        params: {
            placement: 4596956,
            network: '10809.1'
        }
    }, {
      bidder: "districtmDMX",
      params: {
        id: '167675'
      }
    }],
    sizes: [
      [300, 250]
    ]
  }, {
    code: "ad-leaderboard-mobile",
    bids: [{
      bidder: 'rubicon',
      params: {
        accountId: 10844,
        siteId: 118032,
        zoneId: 647968
      }
    }, {
       bidder: 'sovrn',
       params: {
          tagid: 435841
      }
    }, {
      bidder: 'pulsepoint',
      params: {
        cf: '320X50',
        cp: 560738,
        ct: 583868
      }
    }, {
        bidder: 'aol',
        params: {
            placement: 4596958,
            network: '10809.1'
        }
    }, {
      bidder: "districtmDMX",
      params: {
        id: '167676'
      }
    }],
    sizes: [
      [320, 50]
    ]
  }];

  pbjs.addAdUnits(adUnits);
  pbjs.requestBids({

    bidsBackHandler: function(bidResponses) {
       initAdserver();

     },
    timeout : PREBID_TIMEOUT

  });

});
<!-- Prebid Header Bidding Setup END -->
`
var preBidHeaderOne = `
!function(e,t,n,i,r){window[e]=window[e]||function(){window[e].opts.queue.push(arguments)},window[e].opts={url:n,bidPriceKey:i,pubId:r,queue:[]};var o=document.createElement("script");o.src=t,o.async=!0,o.type="text/javascript";var s=document.getElementsByTagName("script");s[0].parentNode.insertBefore(o,s[0])}("PulsePointPrebidAnalytics","http://tag.contextweb.com/pba.js","http://bh.contextweb.com/hba","hb_pb","560738");
`
// var preBidHeaderTwo = `
// preBidHeaderTwo
// `

var dfp = `
var gptAdSlots = [];
var dfpId = "/1263664/";
var inlineAdCount = 0;

googletag.cmd.push(function() {

  pbjs.que.push(function() {
     pbjs.setTargetingForGPTAsync();
  });
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();
});
`

module.exports = {
  preBidHeaderOne,
  preBidHeaderTwo,
  dfp
}
