import Input from 'components/input';
import { useState } from 'react';
import Button from 'components/button';
import { useRouter } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    email: '',
    password: '',
};

export default function Signing() {
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const router = useRouter()

    const onChange = (e) => {
        const { value, name } = e.currentTarget;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const submitForm = async () => {
        const { email, password } = formData;
        if (!email.trim()) {
          setError({
            field: 'email',
            message: 'L\'email est obligatoire',
          });
          return;
        }
    
        setLoading(true);

        try{
            const res = await fetch('http://localhost:8000/comptes/users/login/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: email,
                  password: password,
                }),
              });
      
              const data = await res.json()
              localStorage.setItem('user', JSON.stringify(data))
              window.location.href = "/"

              if(data.message){
                setError(data.message)
              }
              

        }catch(erreur){
            console.error("Erreur ==> ", erreur)
            setError("Erreur survenue")
        }

        setLoading(false);
      };

    return (
        <div className="flex flex-col px-30px pt-20px">
          <span className="flex font-semibold text-gray-900 text-18px mb-15px">
            Connexon d'un agriculteur
          </span>
          <div className="flex flex-col">
            <div className="flex flex-col mb-45px">
                <Input
                placeholder="Adresse Email"
                name="email"
                value={formData.email}
                onChange={onChange}
                className="mt-15px"
                />
                {error?.field === 'email' && (
                <p className="text-12px font-semibold text-error pt-10px pl-15px">
                    {error.message}
                </p>
                )}
                <Input
                placeholder="Mot de passe"
                myType="password"
                name="password"
                value={formData.password}
                onChange={onChange}
                className="mt-15px"
                />
            </div>
            <div className="flex flex-col">
                <Button className="big w-full" onClick={submitForm} loading={loading}>
                Se connecter
                </Button>
            </div>
            <p className="text-12px font-semibold text-error pt-10px pl-15px">
                {error}
            </p>
          </div>
        </div>
    );
  }