export default function useConfirm(message, onConfirm, onAbort = () => {}) {
	const confirm = () => {
		if (window.confirm(message)) onConfirm();
		else onAbort();
	};
	return confirm;
}
