function fnReady() {
    fnReadyHeader();
    fnReadyNav();
    fnReadyFooter();
};


var header, headerHeight = 0;

function fnReadyHeader() {
    header = $api.byId('header');
    if (header) {
        $api.fixIos7Bar(header);
        headerHeight = $api.offset(header).h;
    }
};

var nav, navHeight = 0;

function fnReadyNav() {
    nav = $api.byId('nav');
    if (nav) {
        navHeight = $api.offset(nav).h;
    }
};

var footer, footerHeight = 0;

function fnReadyFooter() {
    footer = $api.byId('footer');
    if (footer) {
        footerHeight = $api.offset(footer).h;
    }
};
