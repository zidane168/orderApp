"use strict";
exports.__esModule = true;
exports.useProfile = void 0;
var react_1 = require("react");
function useProfile() {
    var _a = react_1.useState({}), data = _a[0], setData = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    react_1.useEffect(function () {
        setLoading(true);
        fetch('/api/profile').then(function (response) {
            response.json().then(function (data) {
                setData(data);
                setLoading(false);
            });
        });
    }, []);
    return { loading: loading, data: data };
}
exports.useProfile = useProfile;
