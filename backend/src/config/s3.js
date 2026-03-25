/**
 * S3 / object storage configuration placeholder.
 * Wire AWS_REGION, S3_BUCKET, etc. when uploads are implemented.
 */
module.exports = {
  region: process.env.AWS_REGION || null,
  bucket: process.env.S3_BUCKET || null,
};
