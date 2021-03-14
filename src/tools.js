export default {
    $push(a, o) {
        if (!a.find(e => e.key === o.key && e.value === o.value)) a.push(o);
    },
    $delete(a, b, test) {
        if (b.length > 0) {
            for (let i = 0; i < a.length; i++) {
                for (let j = 0; j < b.length; j++) {
                    if (test(a[i], b[j])) {
                        a.splice(i--, 1);
                        b.splice(j--, 1);
                        break;
                    }
                }
                if (b.length == 0) {
                    break;
                }
            }
        }
    }
}