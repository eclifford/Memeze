JST['post'] = function anonymous(locals, attrs, escape, rethrow) {
var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;
var __jade = [{ lineno: 1, filename: undefined }];
try {
var buf = [];
with (locals || {}) {
var interp;
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
buf.push('<div');
buf.push(attrs({ "class": ('post') }));
buf.push('>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('<img');
buf.push(attrs({ 'src':('http://graph.facebook.com/' + (user.facebookId) + '/picture') }));
buf.push('/>');
__jade.shift();
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
var __val__ = title
buf.push(escape(null == __val__ ? "" : __val__));
__jade.shift();
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
var __val__ = body
buf.push(escape(null == __val__ ? "" : __val__));
__jade.shift();
__jade.shift();
buf.push('</div>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
};
