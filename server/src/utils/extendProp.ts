export interface ExtendPropOptions {
  label?: string;
  value?: string;
  unit?: string;
  /** label、value、unit三者一项为空，默认设置为dynamicValueKey  */
  dynamicValueKey?: string;
}


/**
 *
 * @param options ExtendPropOptions
 * @returns
 * @description 扩展 xxxLabel/xxxValue/xxxUnit属性
 */
export function extendProp(options: ExtendPropOptions): any {

  return (target, prop, descriptor) => {

    const labelMetadataKey = `label`;
    const valueMetadataKey = `value`;
    const unitMetadataKey = `unit`;
    const dynamicValueKeyMetadataKey = `dynamicValueKey`;
    const labelMetadataValue = options.label;
    const valueMetadataValue = options.value;
    const unitMetadataValue = options.unit;
    let dynamicValueKeyMetadataValue = options.dynamicValueKey;

    if(!dynamicValueKeyMetadataValue) {
      if(!options.value) {
        dynamicValueKeyMetadataValue = 'value';
      } else if(!options.label) {
        dynamicValueKeyMetadataValue = 'label';
      } else if(!options.unit) {
        dynamicValueKeyMetadataValue = 'unit';
      }

      if(!dynamicValueKeyMetadataKey) {
        const error = new Error('请设置dynamicValueKey或者label、value、unit三者一项为空');
        console.error(error);
        throw error;
      }
    }

    Reflect.defineMetadata(labelMetadataKey, () => labelMetadataValue, target, prop)
    Reflect.defineMetadata(valueMetadataKey, () => valueMetadataValue, target, prop)
    Reflect.defineMetadata(unitMetadataKey, () => unitMetadataValue, target, prop)
    Reflect.defineMetadata(dynamicValueKeyMetadataKey, () => dynamicValueKeyMetadataValue, target, prop)

    return descriptor;
  }
}

export function extendPropConvert(data: any) {
  const keys = Object.keys(data);
  for(const key of keys) {

    const hasMetadata = Reflect.hasMetadata('label', data, key);
    const value = data[key];

    if(hasMetadata) {

      let metaValueLabel = Reflect.getMetadata('label', data, key)();
      let metaValueValue = Reflect.getMetadata('value', data, key)();
      let metaValueUnit = Reflect.getMetadata('unit', data, key)();
      let metaValueDynamicKey = Reflect.getMetadata('dynamicValueKey', data, key)();

      const newLabelKey = `${key}Label`;
      const newValueKey = `${key}Value`;
      const newUnitKey = `${key}Unit`;

      data[newLabelKey] = metaValueDynamicKey === 'label' ? value : metaValueLabel;
      data[newValueKey] = metaValueDynamicKey === 'value' ? value : metaValueValue;
      data[newUnitKey] = metaValueDynamicKey === 'unit' ? value : metaValueUnit;

    }
  }

  return data
}
