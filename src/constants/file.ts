const MB = 5; // 5 MB
const FILE_SIZE_LIMIT = MB * 1024 * 1024;
const DEFAULT_FOLDER = "public";
const FILE_EXNTESION = {
  IMAGE_EXTENSION: [".png", ".jpg", ".jpeg"],
  ICON_EXTENSION: [".svg"],
  AUDIO_EXTENSION: [".mp3"],
  DOCUMENT_EXTENSION: [".doc", ".docx", ".txt"],
  VIDEO_EXTENSION: [".mp4"],
};
const ACCEPTED_FILE = [
  ...FILE_EXNTESION.IMAGE_EXTENSION,
  ...FILE_EXNTESION.AUDIO_EXTENSION,
  ...FILE_EXNTESION.DOCUMENT_EXTENSION,
  ...FILE_EXNTESION.VIDEO_EXTENSION,
  ...FILE_EXNTESION.ICON_EXTENSION,
];

const FILE_PATH = {
  IMAGE_PATH: `${DEFAULT_FOLDER}/images/`,
  AUDIO_PATH: `${DEFAULT_FOLDER}/audios/`,
  DOCUMENT_PATH: `${DEFAULT_FOLDER}/docs/`,
  VIDEO_PATH: `${DEFAULT_FOLDER}/videos/`,
  ICON_PATH: `${DEFAULT_FOLDER}/icons`,
};

export { MB, FILE_SIZE_LIMIT, ACCEPTED_FILE, FILE_PATH, FILE_EXNTESION };
