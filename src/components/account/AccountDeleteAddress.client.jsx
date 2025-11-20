import {Text, Button} from '~/components/elements';
import {useRenderServerComponents} from '~/lib/utils';

export function AccountDeleteAddress({addressId, close}) {
  // Necessary for edits to show up on the main page
  const renderServerComponents = useRenderServerComponents();

  async function deleteAddress(id) {
    const response = await callDeleteAddressApi(id);
    if (response.error) {
      alert(response.error);
      return;
    }
    renderServerComponents();
    close();
  }

  return (
    <>
      <Text className="mb-4" as="h3" size="lead">
        Confirm removal
      </Text>
      <Text as="p">¿Estás seguro de que gustarías remover este artículo?</Text>
      <div className="mt-6">
        <Button
          className="text-sm"
          onClick={() => {
            deleteAddress(addressId);
          }}
          variant="primary"
          width="full"
        >
          Confirm
        </Button>
        <Button
          className="text-sm mt-2"
          onClick={close}
          variant="secondary"
          width="full"
        >
          Cancelar
        </Button>
      </div>
    </>
  );
}

export async function callDeleteAddressApi(id) {
  try {
    const res = await fetch(`/account/address/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      },
    });
    if (res.ok) {
      return {};
    } else {
      return res.json();
    }
  } catch (_e) {
    return {
      error: 'Error removing address. Please try again.',
    };
  }
}
