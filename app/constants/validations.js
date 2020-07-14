import I18n from '../I18n';
import * as Yup from 'yup';

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
  name: {
    length: {
      minimum: 3,
      maximum: 50,
    },
    presence: true,
  },
  email: {
    email: true,
    presence: true,
  },
  mobile: {
    length: {
      minimum: 6,
      maximum: 15,
    },
    presence: true,
  },
};

export const storeClassifiedConstrains = {
  name: {length: {minimum: 3}, presence: true},
  price: {
    presence: true,
    length: {
      minimum: 1,
      maximum: 6,
      message: I18n.t('validations.price_at_least_one_number_or_max_six'),
    },
    format: {
      pattern: '[a-z0-9]+',
    },
  },
  mobile: {
    length: {
      minimum: 6,
      maximum: 11,
      message: I18n.t('validations.mobile_at_least_size_numbers_or_max_eleven'),
    },
    presence: true,
  },
  description: {length: {minimum: 5, max: 200}, presence: true},
  image: {presence: {allowEmpty: false}},
  images: {
    presence: {allowEmpty: false},
    length: {
      minimum: 2,
      maximum: 5,
      message: I18n.t('validations.images_tow_only'),
    },
  },
};

export const editClassifiedConstrains = {
  name: {length: {minimum: 3}, presence: true},
  price: {
    presence: true,
    length: {minimum: 1, maximum: 10},
    format: {
      pattern: '[a-z0-9]+',
    },
  },
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

export const validateSubmitRegister = Yup.object().shape({
  name: Yup.string()
    .min(5, {message: 'validations.username_must_be_not_less_than', item: 5})
    .required('validations.country_is_required'),
  // .matches(/^[A-Za-z][A-Za-z0-9]*$/, {
  //   message: 'validations.strings_must_matches_the_expression'
  // }),
  email: Yup.string().email('validations.must_be_valid_email').required(),
  password: Yup.string().min(8, {
    message: 'validations.password_must_not_be_larger_than',
    item: 6,
  }),
  role_id: Yup.number().required(),
  logo: Yup.array().required({
    message: 'validations.language_is_required',
  }),
  images: Yup.array().required({
    message: 'validations.language_is_required',
  }),
  // password2: Yup.string()
  //     .min(6, {
  //       message: 'validations.password_must_not_be_larger_than',
  //       item: 6
  //     })
  //     .oneOf([Yup.ref('password1'), null], 'validations.password_must_match')
});
