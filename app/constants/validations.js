import I18n from '../I18n';

export const submitLogin = {
  email: {
    presence: true,
    email: true,
    length: {
      minimum: 2,
      message: 'must be at least 2 characters.',
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must be at least 6 characters.',
    },
  },
};

export const registerConstrains = {
  name: {length: {minimum: 3}, presence: true},
  email: {email: true, presence: true},
  mobile: {length: {minimum: 6}, presence: true},
};

export const storeClassifiedConstrains = {
  name: {length: {minimum: 3}, presence: true},
  price: {presence: true, length: {minimum: 1}},
  mobile: {length: {minimum: 6}, presence: true},
  description: {length: {minimum: 5}, presence: true},
  image: {presence: {allowEmpty: false}},
  images: {presence: {allowEmpty: false}, length: {minimum: 2}},
};

export const editClassifiedConstrains = {
  name: {length: {minimum: 3}, presence: true},
  price: {presence: true},
  mobile: {length: {minimum: 6}, presence: true},
  description: {length: {minimum: 5}, presence: true},
  image: {presence: {allowEmpty: true}},
  images: {presence: {allowEmpty: false}, length: {minimum: 2}},
};

export const commentStoreConstrains = {
  title: {length: {minimum: 3}, presence: true},
  content: {length: {minimum: 3}, presence: true},
};

export const userRegisterRequestConstraints = {
  name: {
    presence: true,
    length: {
      minimum: 5,
      message: 'must be at least 3 characters',
    },
  },
  email: {
    presence: true,
    email: true,
    length: {
      minimum: 4,
      message: 'must be at least 4 characters.',
    },
  },
  description: {
    presence: true,
    length: {
      minimum: 10,
      message: 'must be at least 10 characters.',
    },
  },
  mobile: {
    presence: true,
    length: {
      minimum: 8,
      message: 'must be at least 8 numbers',
    },
  },
  address: {
    presence: true,
    length: {
      minimum: 6,
      message: I18n.t('address_validation_message'),
    },
  },
};

export const forgetPasswordConstrains = {
  mobile: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must be at least 8 numbers',
    },
  },
  email: {
    presence: true,
    email: true,
    length: {
      minimum: 4,
      message: 'must be at least 4 characters.',
    },
  },
};

export const loginConstrains = {
  email: {
    presence: true,
    email: true,
    length: {
      minimum: 4,
      message: 'must be at least 4 characters.',
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must be at least 6 characters',
    },
  },
};
