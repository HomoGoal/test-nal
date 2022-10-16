export type ModalEditPropsType = {
  visible: boolean;
  onCancel: any;
  data: object | any;
  reload: Function;
};

export type OnFinishType = {
  title: string;
  content: string;
  img: string | Blob;
};
