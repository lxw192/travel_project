import { useNavigate } from 'react-router-dom';

export default function anonyCom(C: any) {
  return (props: any) => {
    return <C {...props} navigate={useNavigate()} />;
  };
}