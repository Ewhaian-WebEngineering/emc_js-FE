let showModalRef = null;

export const modalStore = {
  register: (showModalFn) => {
    showModalRef = showModalFn;
  },

  show: (options) => {
    if (!showModalRef) {
      return Promise.resolve({ confirmed: false });
    }
    return showModalRef(options);
  },
};
