const crypto = require("crypto");

// URLs
const WIKIPEDIA_ID_URL = "http://en.wikipedia.org/?curid=";
const WIKIPEDIA_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/";

export default results => {
  let author = results.query.pages[Object.keys(results.query.pages)[0]];

  author = {
    image: getThumbnailSource(author.thumbnail.source, author.pageimage),
    signatureImage: author.images.filter(
      image =>
        image.title
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(
            `${author.title.toLowerCase().replace(/\s/g, "")}signature`
          ) ||
        image.title.includes("Signature") ||
        image.title.toLowerCase().includes("firma")
    ),
    signature: author.title,
    extract: reduceExtract(author.extract),
    pageUrl: WIKIPEDIA_ID_URL + author.pageid
  };

  author = { ...author, signatureImage: getImageUrl(author.signatureImage) };

  return author;
};

const getThumbnailSource = (source, pageImage) => {
  if (source.toLowerCase().indexOf(".jpg") !== -1) {
    return (
      source.substring(0, source.toLowerCase().indexOf(".jpg") + 4) + `/190px-${pageImage}`
    );
  } else if (source.toLowerCase().indexOf(".svg") !== -1) {
    return (
      source.substring(0, source.toLowerCase().indexOf(".svg") + 4) + `/190px-${pageImage}`
    );
  } else if (source.toLowerCase().indexOf(".png") !== -1) {
    return (
      source.substring(0, source.toLowerCase().indexOf(".png") + 4) + `/190px-${pageImage}`
    );
  } else {
    return "";
  }
};

const getImageUrl = name => {
  if (name.length <= 0) {
    return undefined;
  }

  let imageName = name[0].title.replace("File:", "");
  imageName = imageName.replace(/\s/g, "_");
  const imageMD5 = crypto
    .createHash("md5")
    .update(imageName)
    .digest("hex");
  const imageUrl =
    WIKIPEDIA_IMAGE_URL +
    `${imageMD5.charAt(0)}/${imageMD5.substring(0, 2)}/${imageName}`;

  return imageUrl;
};

const reduceExtract = extract => {
  let index = extract.indexOf(".");

  if (index !== -1) {
    while (extract.length > 50 && index < 50) {
      index = extract.indexOf(".", index + 1);
    }
  } else return extract;

  return extract.substring(0, index + 1);
};
