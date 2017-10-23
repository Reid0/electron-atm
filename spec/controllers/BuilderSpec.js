describe("Builder", function() {
  var Builder = require('../../src/controllers/builder.js');
  var b;
  var luno = '777';

  beforeEach(function() {
    b = new Builder();
  });

  describe("build()", function(){
    it("should return null on empty message", function() {
      expect(b.build(undefined)).toBeNull();
    });

    it("should build solicited ready status message", function() {
      var object = {
        message_class: 'Solicited',
        message_subclass: 'Status',
        status_descriptor: 'Ready',
      };
      expect(b.build(object)).toEqual('22\x1C777\x1C\x1C9');
    });

    it("should build solicited command reject status message", function() {
      var object = {
        message_class: 'Solicited',
        message_subclass: 'Status',
        status_descriptor: 'Command Reject',
      };
      expect(b.build(object)).toEqual('22\x1C777\x1C\x1CA');
    });

    it("should build solicited specific command reject status message", function() {
      var object = {
        message_class: 'Solicited',
        message_subclass: 'Status',
        status_descriptor: 'Specific Command Reject',
      };
      expect(b.build(object)).toEqual('22\x1C777\x1C\x1CC');
    });

    it("should build Unsolicited Transaction Request message with all data provided", function() {
      var object = {
        message_class: 'Unsolicited',
        message_subclass: 'Transaction Request',
        top_of_receipt: '1',
        message_coordination_number: '?',
        track2: ';8990011234567890=20062011987612300720?',
        track3: ';011234567890123445=724724000000000****00300XXXX020200099010=********************==1=100000000000000000**?*',
        opcode_buffer: 'BA BA BA',
        amount_buffer: '000000001337',
        PIN_buffer: ';>:>:=>:>:>:>:>:',
        buffer_B: '19671994',
        buffer_C: '1337',
        track1: '%B1234567890123445^PADILLA/L.                ^99011X100000*000000000XXX000000?',
      };
      expect(b.build(object)).toEqual('11\x1C777\x1C\x1C\x1C1?\x1C;8990011234567890=20062011987612300720?\x1C;011234567890123445=724724000000000****00300XXXX020200099010=********************==1=100000000000000000**?*\x1CBA BA BA\x1C000000001337\x1C;>:>:=>:>:>:>:>:\x1C19671994\x1C1337\x1C%B1234567890123445^PADILLA/L.                ^99011X100000*000000000XXX000000?\x1C');
    });

    it("should build Unsolicited Transaction Request message without track2 provided", function() {
      var object = {
        message_class: 'Unsolicited',
        message_subclass: 'Transaction Request',
        top_of_receipt: '1',
        message_coordination_number: '?',
        opcode_buffer: 'BA BA BA',
        amount_buffer: '000000001337',
        PIN_buffer: ';>:>:=>:>:>:>:>:',
        buffer_B: '19671994',
        buffer_C: '1337',
        track1: '%B1234567890123445^PADILLA/L.                ^99011X100000*000000000XXX000000?',
      };
      expect(b.build(object)).toEqual('11\x1C777\x1C\x1C\x1C1?\x1C\x1C\x1CBA BA BA\x1C000000001337\x1C;>:>:=>:>:>:>:>:\x1C19671994\x1C1337\x1C%B1234567890123445^PADILLA/L.                ^99011X100000*000000000XXX000000?\x1C');
    });

    it("should build Unsolicited Transaction Request message without opcode_buffer provided", function() {
      var object = {
        message_class: 'Unsolicited',
        message_subclass: 'Transaction Request',
        top_of_receipt: '1',
        message_coordination_number: '?',
        track2: ';8990011234567890=20062011987612300720?',
        amount_buffer: '000000001337',
        PIN_buffer: ';>:>:=>:>:>:>:>:',
        buffer_B: '19671994',
        buffer_C: '1337',
        track1: '%B1234567890123445^PADILLA/L.                ^99011X100000*000000000XXX000000?',
      };
      expect(b.build(object)).toEqual('11\x1C777\x1C\x1C\x1C1?\x1C;8990011234567890=20062011987612300720?\x1C\x1C\x1C000000001337\x1C;>:>:=>:>:>:>:>:\x1C19671994\x1C1337\x1C%B1234567890123445^PADILLA/L.                ^99011X100000*000000000XXX000000?\x1C');
    });

    it("should build Unsolicited Transaction Request message without amount_buffer provided", function() {
      var object = {
        message_class: 'Unsolicited',
        message_subclass: 'Transaction Request',
        top_of_receipt: '1',
        message_coordination_number: '?',
        track2: ';8990011234567890=20062011987612300720?',
        opcode_buffer: 'BA BA BA',
        PIN_buffer: ';>:>:=>:>:>:>:>:',
        buffer_B: '19671994',
        buffer_C: '1337',
        track1: '%B1234567890123445^PADILLA/L.                ^99011X100000*000000000XXX000000?',
      };
      expect(b.build(object)).toEqual('11\x1C777\x1C\x1C\x1C1?\x1C;8990011234567890=20062011987612300720?\x1C\x1CBA BA BA\x1C\x1C;>:>:=>:>:>:>:>:\x1C19671994\x1C1337\x1C%B1234567890123445^PADILLA/L.                ^99011X100000*000000000XXX000000?\x1C');
    });

    it("should build Unsolicited Transaction Request message without PIN_buffer provided", function() {
      var object = {
        message_class: 'Unsolicited',
        message_subclass: 'Transaction Request',
        top_of_receipt: '1',
        message_coordination_number: '?',
        track2: ';8990011234567890=20062011987612300720?',
        opcode_buffer: 'BA BA BA',
        amount_buffer: '000000001337',
        buffer_B: '19671994',
        buffer_C: '1337',
        track1: '%B1234567890123445^PADILLA/L.                ^99011X100000*000000000XXX000000?',
      };
      expect(b.build(object)).toEqual('11\x1C777\x1C\x1C\x1C1?\x1C;8990011234567890=20062011987612300720?\x1C\x1CBA BA BA\x1C000000001337\x1C\x1C19671994\x1C1337\x1C%B1234567890123445^PADILLA/L.                ^99011X100000*000000000XXX000000?\x1C');
    });

    it("should build Unsolicited Transaction Request message without Buufer B provided", function() {
      var object = {
        message_class: 'Unsolicited',
        message_subclass: 'Transaction Request',
        top_of_receipt: '1',
        message_coordination_number: '?',
        track2: ';8990011234567890=20062011987612300720?',
        opcode_buffer: 'BA BA BA',
        amount_buffer: '000000001337',
        PIN_buffer: ';>:>:=>:>:>:>:>:',
        buffer_C: '1337',
        track1: '%B1234567890123445^PADILLA/L.                ^99011X100000*000000000XXX000000?',
      };
      expect(b.build(object)).toEqual('11\x1C777\x1C\x1C\x1C1?\x1C;8990011234567890=20062011987612300720?\x1C\x1CBA BA BA\x1C000000001337\x1C;>:>:=>:>:>:>:>:\x1C\x1C1337\x1C%B1234567890123445^PADILLA/L.                ^99011X100000*000000000XXX000000?\x1C');
    });

    it("should build Unsolicited Transaction Request message without Buffer C provided", function() {
      var object = {
        message_class: 'Unsolicited',
        message_subclass: 'Transaction Request',
        top_of_receipt: '1',
        message_coordination_number: '?',
        track2: ';8990011234567890=20062011987612300720?',
        opcode_buffer: 'BA BA BA',
        amount_buffer: '000000001337',
        PIN_buffer: ';>:>:=>:>:>:>:>:',
        buffer_B: '19671994',
        track1: '%B1234567890123445^PADILLA/L.                ^99011X100000*000000000XXX000000?',
      };
      expect(b.build(object)).toEqual('11\x1C777\x1C\x1C\x1C1?\x1C;8990011234567890=20062011987612300720?\x1C\x1CBA BA BA\x1C000000001337\x1C;>:>:=>:>:>:>:>:\x1C19671994\x1C\x1C%B1234567890123445^PADILLA/L.                ^99011X100000*000000000XXX000000?\x1C');
    });

    it("should build Unsolicited Transaction Request message without Track 1 data provided", function() {
      var object = {
        message_class: 'Unsolicited',
        message_subclass: 'Transaction Request',
        top_of_receipt: '1',
        message_coordination_number: '?',
        track2: ';8990011234567890=20062011987612300720?',
        opcode_buffer: 'BA BA BA',
        amount_buffer: '000000001337',
        PIN_buffer: ';>:>:=>:>:>:>:>:',
        buffer_B: '19671994',
        buffer_C: '1337'
      };
      expect(b.build(object)).toEqual('11\x1C777\x1C\x1C\x1C1?\x1C;8990011234567890=20062011987612300720?\x1C\x1CBA BA BA\x1C000000001337\x1C;>:>:=>:>:>:>:>:\x1C19671994\x1C1337\x1C\x1C');
    });
  });

  describe('build \'Terminal State\'', function(){
    it('should build \'Send Configuration Information\' terminal state solicited status', function(){
      var object = {
        message_class: 'Solicited',
        message_subclass: 'Status',
        status_descriptor: 'Terminal State',
        terminal_command: 'Send Configuration Information',
        config_id: '0789',
        hardware_fitness: '0000000000000000000000',
        hardware_configuration: '157F000901020483000001B1000000010202047F7F00',
        supplies_status: '00011111001000011130011',
        sensor_status: '000000000000',
        release_number: '030300',
        ndc_software_id: 'G531‐0283'        
      };
      expect(b.build(object)).toEqual('22\x1C777\x1C\x1CF\x1C10789\x1C0000000000000000000000\x1C157F000901020483000001B1000000010202047F7F00\x1C00011111001000011130011\x1C000000000000\x1C030300\x1CG531‐0283');
    });

    it('should build \'Send Configuration ID\' terminal state solicited status', function(){
      var object = {
        message_class: 'Solicited',
        message_subclass: 'Status',
        status_descriptor: 'Terminal State',
        terminal_command: 'Send Configuration ID',
        config_id: '0192'
      };
      expect(b.build(object)).toEqual('22\x1C777\x1C\x1CF\x1C60192');
    });

    it('should build \'Send Supply Counters\' terminal state solicited status', function(){
      var object = {
        message_class: 'Solicited',
        message_subclass: 'Status',
        status_descriptor: 'Terminal State',
        terminal_command: 'Send Supply Counters',
        tsn: '0001',
        transaction_count: '0000002',
        notes_in_cassettes: '00011000220003300044',
        notes_rejected: '00000000092987389800',
        notes_dispensed: '00090102028129100001',
        last_trxn_notes_dispensed: '01102030294020102301',
        card_captured: '00020',
        envelopes_deposited: '00000',
        camera_film_remaining: '00000',
        last_envelope_serial: '00000'
      };
      expect(b.build(object)).toEqual('22\x1C777\x1C\x1CF\x1C2000100000020001100022000330004400000000092987389800000901020281291000010110203029402010230100020000000000000000');
    });
  });
});
