import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

export default function IsoIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        d={
          'M3.5 5C2.40694 5 1.5 5.90694 1.5 7V18C1.5 19.0931 2.40694 20 3.5 20H21.5C22.5931 20 23.5 19.0931 23.5 18V7C23.5 5.90694 22.5931 5 21.5 5H3.5ZM3.5 7H21.5V18H3.5V7ZM7.5 10V15H8.5V10H7.5ZM15.5 10C14.395 10 13.5 10.895 13.5 12V13C13.5 14.105 14.395 15 15.5 15C16.605 15 17.5 14.105 17.5 13V12C17.5 10.895 16.605 10 15.5 10ZM10.9902 10.002C10.0962 9.97695 9.45184 10.4843 9.46484 11.3613C9.47984 12.3353 10.3023 12.6426 10.8223 12.8926C11.1923 13.0706 11.5415 13.2902 11.5195 13.6562C11.5055 13.8743 11.4168 14.1672 11.0098 14.2012C10.3328 14.2562 10.3203 13.5454 10.3203 13.3984H9.3457C9.3457 13.6754 9.45077 15.017 11.0098 15C12.4428 14.985 12.4981 13.8644 12.4961 13.6504C12.4871 12.6424 11.3783 12.1484 11.1543 12.0664C11.0473 12.0184 10.4645 11.8082 10.4355 11.3672C10.4055 10.8842 10.7977 10.8066 10.9727 10.8066C11.5487 10.8066 11.5312 11.4029 11.5312 11.5059H12.5C12.5 11.2849 12.4132 10.043 10.9902 10.002ZM15.5 11C16.051 11 16.5 11.449 16.5 12V13C16.5 13.551 16.051 14 15.5 14C14.949 14 14.5 13.551 14.5 13V12C14.5 11.449 14.949 11 15.5 11Z'
        }
      />
    </SvgIcon>
  );
}