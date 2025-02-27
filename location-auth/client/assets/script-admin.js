```javascript
function setAdminLocation() {
    const adminID = document.getElementById("adminID").value;
    if (!adminID) return alert("관리자 ID를 입력하세요.");

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        var map = new kakao.maps.Map(document.getElementById('map'), {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 3
        });
        new kakao.maps.Marker({ position: map.getCenter(), map });

        fetch('http://localhost:3000/setAdminLocation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ adminID, latitude, longitude })
        }).then(res => res.json())
          .then(data => alert(data.message))
          .catch(err => console.error(err));
    });
}
```
