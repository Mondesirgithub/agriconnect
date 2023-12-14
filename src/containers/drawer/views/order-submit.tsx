import { useContext } from 'react';
import { DrawerContext } from 'contexts/drawer/drawer.provider';
import ArrowLeft from 'assets/icons/arrow-left';
import SuccessIcon from 'assets/icons/success-tick';

export default function OrderSubmit() {
  const { dispatch } = useContext(DrawerContext);
  const hideCart = () => {
    dispatch({
      type: 'SLIDE_CART',
      payload: {
        open: false,
      },
    });
  };

  return (
    <>
      <div className="w-full flex px-30px relative">
        <button
          className="w-auto h-10 flex items-center justify-center text-gray-500 absolute top-half mt-20px left-30px transition duration-300 focus:outline-none hover:text-gray-900"
          onClick={hideCart}
          aria-label="close"
        >
          <ArrowLeft />
        </button>
      </div>

      <div className="flex flex-col pb-60px flex-auto justify-center">
        <div className="flex items-center justify-center text-green">
          <SuccessIcon style={{ width: 60 }} />
        </div>

        <div className="flex flex-col items-center px-40px md:px-80px mt-15px">
          <h3 className="text-center text-18px font-semibold text-gray-900 mb-40px">
            Confirmation de la commande
          </h3>
          <p className="text-center text-14px font-semibold text-gray-900 mb-1">
            Merci de continuer le processus sur votre téléphone portable
          </p>
          <p className="text-center text-13px text-gray-700">
            Après validation, nous enverrons un message au propriétaire afin de vous contacter
          </p>
        </div>
      </div>
    </>
  );
}
