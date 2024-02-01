import { ConnectButton } from "@mysten/dapp-kit";
import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import { WalletStatus } from "./WalletStatus";
import { getWallets } from '@mysten/wallet-standard';

function App() {
  const walletsApi = getWallets();
	const wallets = walletsApi.get();
  console.log('wallets', wallets[0]);

  let signMsg = '';
  let suiAccount = '';

  const connectWallet = async() => {
    const wallet = wallets[0];
    const connectResult = await (wallet.features['standard:connect'] as any).connect();
    suiAccount = connectResult.accounts[0].address;
    console.log('suiAccount', suiAccount)
  }

  const signMessage = async() => {
    const wallet = wallets[0];
    const { messageBytes, signature } = await (wallet.features['sui:signPersonalMessage'] as any).signPersonalMessage({
      message: new TextEncoder().encode('hello world'),
      account: suiAccount
    });

    console.log( messageBytes, signature)
  }

  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading>dApp Starter Template</Heading>
        </Box>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <Container>
        <Container
          mt="5"
          pt="2"
          px="4"
          style={{ background: "var(--gray-a2)", minHeight: 500 }}
        >
          <WalletStatus />
        </Container>
      </Container>
      <Container><div onClick={connectWallet}>click me</div></Container>
      <Container><div onClick={signMessage}>sign message</div></Container>
      <Container><div>{signMsg}</div></Container>
    </>
  );
}

export default App;
