const indata = 
"0044440000"+
"3044440001"+
"3333440001"+
"0000000001"+
"0000011111"

function parseStringOfPixels(s, width) {
	let pixels = [];
	let height = 0;

	while (s.length >= width) {
         let line = s.slice(0, width);
         pixels.push(line);
         s = s.slice(width);
         height++;
	}

	return {
		pixels,
		width,
		height
	}
}

/* Return object that describes the pixels
The object has the followign form:
{
  pixels: [[Color]],
  width: Int,
  height: Int
}
*/
function parseIndata(d) {
	return parseStringOfPixels(d, 10);
}

function colorsEqual(a, b) {
	// case of rgb colors:
	if(a && a.constructor === Array && b && b.constructor === Array && a.length == 4 && b.length == 4) {
		return true &&
			a[0] == b[0] &&
			a[1] == b[1] &&
			a[2] == b[2] &&
			a[3] == b[3];
	}
	return a == b;
}

function convertToRanges(p) {
    function convertLineToRanges(l) {
      if (l.length == 0) {
        return [];
      }

      let curr;
      let ret = []

      function newColor(c) {
      	ret.push({
      		color: c,
      		times: 1
      	})
      }

      function oneMore() {
      	ret[ret.length-1].times++
      }

      for (var i = 0; i < l.length; i++) {
        if (!colorsEqual(l[i], curr)) {
        	curr = l[i];
        	newColor(curr);
        } else {
          oneMore();
        }
      }

      return ret;
    }


	return {
		lines: p.pixels.map(convertLineToRanges),
		width: p.width,
		height: p.height
	}
}

function renderColor(color) {
	if (color.constructor === Array && color.length == 4) {
		return "#" + color[0] + "," + color[1] + "," + color[2];
	}
	return color;
}

function convertToStrings(l) {
  function rangesToString(rs) {
    function rangeToString(r) {
    	return "Farg  " + renderColor(r.color) + ",  \t" + r.times + "  " + 
    	  (r.times == 1 ? "gang." : "ganger.");
    }
    return rs.map(rangeToString);
  }

  return {
  	strings : l.lines.map(rangesToString),
  	width: l.width,
    height: l.height
  }
}

function finalOutput(s) {
	ret = "" +
	"Bredd: " + s.width + "\n" + 
	"Hojd: " + s.height + "\n" + 
	"\n"; 

	for(var i = 0; i < s.strings.length; i++) {
       ret += "RAD " + (i+1) + ":\n"
       for (let str of s.strings[i]) {
       	 ret += str + "\n"
       }
       if (i < s.strings.length-1) {
       	 ret += "NY RAD.\n" +
       	 "\n";
       } else {
       	 ret += "SLUT."
       }
	}

	return ret;
}

function runPipeline(colorArray, rowWidth) {
	var x = parseStringOfPixels(colorArray, rowWidth);
	for (const step of [
		convertToRanges,
		convertToStrings,
		finalOutput
	]) {
		x = step(x)
		console.log(x)
	}
}

console.log("Hello World!")
/*
var steps = [
	parseIndata,
	convertToRanges,
	convertToStrings,
	finalOutput
]
var x = indata;
for (var s of steps) {
	x = s(x)
	console.log(x)
}

*/

runPipeline(indata, 10);
