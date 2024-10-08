import { CustomNavbar } from '@/components/custom-navbar';
import React from 'react';

const BuyMeACoffee: React.FC = () => {
  return (
    <>
      <CustomNavbar />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] w-full bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Buy Me a Coffee</h1>
        <p className="text-lg mb-8">
          If you find this app useful, consider buying me a coffee!
        </p>
        <div className="mt-8 mx-auto">
          <iframe
            title="Buy Me a Coffee"
            srcDoc={`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Buy Me a Coffee</title>
                  <script type='text/javascript' src='https://cdn.trakteer.id/js/embed/trbtn.min.js?date=18-11-2023'></script>
                </head>
                <body style="display:flex; justify-content:center;">
                  <div id="trbtn-container"></div>
                  <script type='text/javascript'>
                    (function(){
                      var trbtnId=trbtn.init('Show your support','#be1e2d','https://trakteer.id/nicecv','https://trakteer.id/images/mix/coffee.png','40');
                      trbtn.draw(trbtnId);
                    })();
                  </script>
                </body>
                </html>
              `}
            className="w-full h-full"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default BuyMeACoffee;
