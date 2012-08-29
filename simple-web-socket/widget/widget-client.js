window.locWidget = {
    style: 'position:absolute;bottom:0;right:0;font-size:3em',
    init: function() {
        var socket = io.connect('http://localhost:8081', {
            resource: 'loc'
        });
        style = this.style;
        socket.on('connect', function() {
            
            var head = document.getElementsByTagName('head')[0],
                body = document.getElementsByTagName('body')[0],
                loc = document.getElementById('_lo_count');

            if (!loc) {
                head.innerHTML = '<style>#_loc {' + style + '}</style>' + head.innerHTML;
                body.innerHTML += '<div id="_loc">Online: <span id="_lo_count"></span></div>';
                loc = document.getElementById('_lo_count');
            }

            socket.on('total', function(total) {
                loc.innerHTML = total;
            });
        });
    }
}
