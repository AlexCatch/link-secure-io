import React, {useCallback} from "react";
import EncryptionItem, {EncryptionItemType} from "./encryption-item";

type EncryptionItemSelectProps = {
  itemSelected: (item: EncryptionItemType) => void;
};

const EncryptionItemSelect: React.FC<EncryptionItemSelectProps> = ({ itemSelected }) => {
  const fileTypeSelected = useCallback(() => {
    itemSelected(EncryptionItemType.file);
  }, [itemSelected]);

  const textTypeSelected = useCallback(() => {
    itemSelected(EncryptionItemType.text);
  }, [itemSelected]);

  return (
    <div className="flex items-center justify-center flex-col sm:flex-row px-4 py-5 space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
      <EncryptionItem type={EncryptionItemType.file} onClick={fileTypeSelected} />
      <EncryptionItem type={EncryptionItemType.text} onClick={textTypeSelected} />
    </div>
  );
}

export default EncryptionItemSelect;