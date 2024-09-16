import { KeyWord } from "../consts/key-words";
import { FormDetails } from "../models/forms";

const replaceKeyWords = ({
  text,
  formDetails,
}: {
  text: string;
  formDetails?: FormDetails;
}) => {
  return text
    .replace(new RegExp(KeyWord.names, "g"), formDetails?.userNames || "*")
    .replace(
      new RegExp(KeyWord.lastNames, "g"),
      formDetails?.userLastNames || "*"
    )
    .replace(new RegExp(KeyWord.cardId, "g"), formDetails?.cardId || "*")
    .replace(
      new RegExp(KeyWord.contractDuration, "g"),
      formDetails?.contractDuration || "*"
    );
};

export default replaceKeyWords;
