import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import config from "../../config";
import { useAccount, useDisconnect } from 'wagmi'
 
function SendTrx(props) {
    let {amount} = props
  const { isConnected, address } = useAccount()

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: config.usdtAddress,
    abi: config.usdtABI,
    functionName: 'transfer',
    chainId:80001,
    args:[config.adminAddress,amount],
    from: address,
  })
 if(isSuccess){
    props.showToast(isSuccess)


 }

  return (
    <div>
         <button
                    className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  sm:text-lg text-sm py-3 px-6 rounded-3xl bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] block w-full"
                    type="button"
                    onClick={() => write()}
                    disabled={isLoading?true:false}
                  >Confirm Transaction</button>
      {isLoading &&  <div className="my-4  w-full text-center">
                <h1 className="sm:text-lg text-sm text-gray-600">
                Check Wallet
                </h1>
              </div>}
     
      {isSuccess &&
      
      <div className="my-4  w-full text-center">
                <h1 className="sm:text-lg text-sm text-gray-600">
                Transaction: {JSON.stringify(data)}
                </h1>
              </div>

    }
    </div>
  )
}

export default SendTrx;