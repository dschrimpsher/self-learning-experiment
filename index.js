var jsonld = require('jsonld');


var doc = {
  "http://schema.org/name": "Manu Sporny",
  "http://schema.org/url": {"@id": "http://manu.sporny.org/"},
  "http://schema.org/image": {"@id": "http://manu.sporny.org/images/manu.png"}
};
var context = {
  "name": "http://schema.org/name",
  "homepage": {"@id": "http://schema.org/url", "@type": "@id"},
  "image": {"@id": "http://schema.org/image", "@type": "@id"}
};

// compact a document according to a particular context
// see: http://json-ld.org/spec/latest/json-ld/#compacted-document-form
jsonld.compact(doc, context, function(err, compacted) {
  console.log(JSON.stringify(compacted, null, 2));
  /* Output:
  {
    "@context": {...},
    "name": "Manu Sporny",
    "homepage": "http://manu.sporny.org/",
    "image": "http://manu.sporny.org/images/manu.png"
  }
  */
});


var htmlparser = require("htmlparser");
var rawHtml = "Xyz <script language= javascript>var foo = '<<bar>>';< /  script><!--<!-- Waah! -- -->";
var handler = new htmlparser.DefaultHandler(function (error, dom) {
    if (error)
        console.log(JSON.stringify(error));
    else
        console.log('Done parsing');
});
var parser = new htmlparser.Parser(handler);
parser.parseComplete(rawHtml);
console.log(JSON.stringify(handler.dom));