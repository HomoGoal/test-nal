export type ModalCreatePropsType = {
  visible: boolean;
  onCancel: any;
  reload: Function;
};

export type OnFinishType = {
  title: string;
  content: string;
  img: string | Blob;
};
