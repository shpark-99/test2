```javascript
function verifyUserLocation() {
    const adminID = document.getElementById("adminID").value;
    if (!adminID) return alert("관리자 ID를 입력하세요.");

    fetch(`http://localhost:3000/getAdminLocation?adminID=${adminID}`)
    .then(res => res.json())
    .then(adminLocation => {
        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
            var map = new kakao.maps.Map(document.getElementById('map'), {
                center: new kakao.maps.LatLng(userLat, userLon),
                level: 3
            });
            new kakao.maps.Marker({ position: new kakao.maps.LatLng(adminLocation.latitude, adminLocation.longitude), map });
            new kakao.maps.Marker({ position: new kakao.maps.LatLng(userLat, userLon), map });
            
            const distance = getDistance(userLat, userLon, adminLocation.latitude, adminLocation.longitude);
            document.getElementById("result").innerText = distance <= 300 
                ? "✅ 인증 완료!"
                : "❌ 인증 실패";
        });
    }).catch(err => console.error(err));
}
```
