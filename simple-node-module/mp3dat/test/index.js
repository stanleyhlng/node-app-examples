var assert = require('assert'),
    mp3dat = require('../index.js'),
    testFile = 'test/torvalds-says-linux.mp3';

assert(mp3dat, 'mp3dat failed to load');
assert(mp3dat.stat, 'there should be a stat method');
assert(mp3dat.stat instanceof Function, 'stat should be a Function');

mp3dat.stat(testFile, function(err, stat) {
    assert.ifError(err);

    // expect properties
    assert(stats.duration, 'should be a truthy duration property.');
    assert(stats.bitrate, 'should be a truthy bitrate property.');
    assert(stats.filesize, 'should be a truthy filesize property.');
    assert(stats.timestamp, 'should be a truthy timestamp property.');
    assert(stats.timesig, 'should be a truthy timesig property.');

    // expect types
    assert.equal(typeof stats.duration, 'object', 'duration should be an object type');
    assert(stats.duration instanceof Object, 'duration should be an instance of Object');

    // expected duration properties
    // expected duration types
    // expected duration properties constraints 
    consle.log('All tests passed');
});
