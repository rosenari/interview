function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
//self는 워커 내부의 worker 전역 스코프에 대한 참조
self.addEventListener('message', function (e) {
    console.log(e.data);
    sleep(3000);
    var coords = Math.random();
    console.log(coords);
    self.postMessage(coords);
});