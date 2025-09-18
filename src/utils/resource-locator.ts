import { Types } from 'cafe-utility'
import { Reference } from './typed-bytes'

export class ResourceLocator {
  constructor(private raw: Reference | Uint8Array | string) {}

  toString() {
    if (Types.isString(this.raw) && this.raw.includes('.eth')) {
      return this.raw
    }

    // Check if it's a Reference-like object by checking for toHex method
    if (this.raw && typeof this.raw === 'object' && 'toHex' in this.raw && typeof this.raw.toHex === 'function') {
      return this.raw.toHex()
    }

    return new Reference(this.raw).toHex()
  }
}
