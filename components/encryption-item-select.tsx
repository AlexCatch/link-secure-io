import React from "react";
import EncryptionItem, {EncryptionItemType} from "./encryption-item";

const EncryptionItemSelect: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col items-center sm:flex-row px-4 py-5 space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
      <EncryptionItem type={EncryptionItemType.file} />
      <EncryptionItem type={EncryptionItemType.text} />
    </div>
  );
}

export default EncryptionItemSelect;