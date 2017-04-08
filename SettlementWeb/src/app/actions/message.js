export const SHOW_GLOBAL_MESSAGE = Symbol();

const show = (msg, msgType) => ({
	type: SHOW_GLOBAL_MESSAGE,
	msgType,
	msg
});

export const success = (msg = '操作成功') => show(msg, 'success');
export const error = (msg) => show(msg, 'error');
export const info = (msg) => show(msg, 'info');
export const warn = (msg) => show(msg, 'warn');